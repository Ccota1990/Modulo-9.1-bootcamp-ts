import { calcularNotaFinal } from "./calcular-nota-final";

describe("calcularNotaFinal", () => {
  it("debería devolver la nota final", () => {
    // Arrange
      const notasMedias = [8, 7];
      const peso = [0.6, 0.4];
    // Act
      const result = calcularNotaFinal(notasMedias, peso);
    // Assert
      const notaFinal = 7.6;
    expect(result).toEqual(notaFinal);
  });
  
  it("debería devolver la nota final", () => {
    // Arrange
      const notasMedias = [6, 7];
      const peso = [0.6, 0.4];
    // Act
      const result = calcularNotaFinal(notasMedias, peso);
    // Assert
      const notaFinal = 6.4;
  expect(result).toEqual(notaFinal);
  });
 
  it("debería devolver la nota final", () => {
    // Arrange
      const notasMedias = [3, 2];
      const peso = [0.6, 0.4];
    // Act
      const result = calcularNotaFinal(notasMedias, peso);
    // Assert
      const notaFinal = 2.6;
  expect(result).toEqual(notaFinal);
  });
});