export function radToDeg(radians) {
    let degrees = (radians * 180) / Math.PI;
    return ((degrees % 360) + 360) % 360;  // Нормализует даже отрицательные углы
}