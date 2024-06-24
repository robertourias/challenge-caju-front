export function removeCpfMask(maskedCpf) {
  // Expressão regular que captura apenas os números do CPF
  const regex = /\d+/g;

  // Extrai os números do CPF formatado
  const numbers = maskedCpf.match(regex);

  // Junta os números em uma única string sem máscara
  const cleanCpf = numbers.join('');

  return cleanCpf;
}
