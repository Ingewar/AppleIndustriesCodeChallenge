import fs from 'fs';
import csv from 'csv-parser';

export function csvToJson(filePath: string, headers?: string[]): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    const csvOptions = headers ? headers : [];
    fs.createReadStream(filePath)
      .pipe(csv(csvOptions))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

/**
 * Converts a CSV file to a JSON object.
 * 
 * @param filePath - The path to the CSV file.
 * @returns A promise that resolves to a JSON object where each key-value pair corresponds to a row in the CSV file.
 * 
 * The CSV file is expected to have two columns:
 * - The first column is used as the key.
 * - The second column is parsed as a number and used as the value.
 * 
 * @throws Will reject the promise if there is an error reading the file or parsing the CSV.
 */
export function reportCSVToJson(filePath: string): Promise<{ [key: string]: any }> {
  return new Promise((resolve, reject) => {
    const result: { [key: string]: any } = {};
    fs.createReadStream(filePath)
      .pipe(csv({ headers: false }))
      .on('data', (data) => {
        const key = data[0];
        const value: number = parseFloat(data[1]);
        result[key] = value;
      })
      .on('end', () => resolve(result))
      .on('error', (error) => reject(error));
  });
}