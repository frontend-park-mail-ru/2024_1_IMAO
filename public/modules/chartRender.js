'use strict';

export const COLOR = {
  POSITIVE: '#0cb477',
  NEGATIVE: '#f44',
  NEUTRAL: '#868695',
  GRADIENT: '#7092FE',
};

/**
 * Paints a chart via data.
 * @param {HTMLCanvasElement} canvas
 * @param {Array} dataArray
 */
export function renderChart(canvas, dataArray) {
  if (dataArray.length == 1) {
    dataArray.push(dataArray[0]);
  }
  const context = canvas.getContext('2d');
  context.strokeStyle = COLOR.NEUTRAL;
  if (dataArray[dataArray.length - 2] - dataArray[dataArray.length - 1] > 0) {
    context.strokeStyle = COLOR.POSITIVE;
  } else if (dataArray[dataArray.length - 2] - dataArray[dataArray.length - 1] < 0) {
    context.strokeStyle = COLOR.NEGATIVE;
  }
  const width = canvas.width;
  const height = canvas.height;
  const step = width / (dataArray.length - 1);
  const middleData = (Math.max(...dataArray) + Math.min(...dataArray)) / 2;
  const middleCanvas = height / 2;
  context.beginPath();
  context.moveTo(0, middleCanvas);
  let currentX = 0;
  dataArray.forEach((val) => {
    const currentY = height - (val * middleCanvas) / middleData;
    if (currentX !== 0) {
      context.lineTo(currentX, currentY);
    }
    context.moveTo(currentX, currentY);
    currentX += step;
  });

  context.closePath();
  context.stroke();
}

/**
 * Paints a chart via data with gradient below.
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} context
 * @param {Array} dataArray
 * @return {Array}
 */
export function renderChartGradient(canvas, context, dataArray) {
  const coordinatesArray = [];
  if (dataArray.length == 1) {
    dataArray.push(dataArray[0]);
  }
  context.strokeStyle = COLOR.GRADIENT;
  context.lineWidth = 3;
  context.lineJoin = 'round';
  const width = canvas.width;
  const height = canvas.height;
  const step = width / (dataArray.length - 1);
  const middleData = (Math.max(...dataArray) + Math.min(...dataArray)) / 2;
  const middleCanvas = height / 2;
  context.beginPath();
  context.moveTo(-3, height + 3);
  context.lineTo(-3, middleCanvas);
  let currentX = 0;
  let currentY = 0;
  let maxY = height;
  dataArray.forEach((val) => {
    currentY = height - (val * middleCanvas) / middleData;
    if (currentY < maxY) {
      maxY = currentY;
    }
    if (currentX !== 0) {
      context.lineTo(currentX, currentY);
    } else {
      context.lineTo(-3, currentY);
      context.lineTo(currentX, currentY);
    }
    coordinatesArray.push({
      x: currentX,
      y: currentY,
    });
    currentX += step;
  });
  context.lineTo(currentX + 3, currentY);
  context.lineTo(currentX + 3, height + 3);

  const gradient = context.createLinearGradient(width / 2, height, width / 2, maxY);
  gradient.addColorStop(0, 'rgba(112, 146, 254, 0.4)');
  gradient.addColorStop(0.5, 'rgba(112, 146, 254, 0.10)');
  gradient.addColorStop(1, 'rgba(112, 146, 254, 0.0)');
  context.fillStyle = gradient;
  context.closePath();
  context.stroke();
  context.fill();

  return coordinatesArray;
}
