import { test, expect } from '@playwright/test';

test('should be able to fetch details of all characters', async ({ request }) => {
  const url = 'https://rickandmortyapi.com/api/character';
  const response = await request.get(url);
  const responseBody = await response.json();
  
  expect(response.status()).toBe(200);
  expect((await response.body()).length).toBeGreaterThan(0);
  expect(responseBody.results[0]).toHaveProperty('id');
  expect(responseBody.results[0]).toHaveProperty('name');
});

test('should be able to fetch details of an existing character', async ({ request }) => {
    const url = 'https://rickandmortyapi.com/api/character/5';
    const response =await request.get(url);
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.id).toBe(5);
    expect(responseBody.name).toBe('Jerry Smith');
});

test('should be able to fetch details from multiple characters', async ({ request }) => {
    const url = 'https://rickandmortyapi.com/api/character/1,3,6';
    const response =await request.get(url);
    const responseBody = await response.json();
    
    expect(response.status()).toBe(200);
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
    expect(responseBody[0]).toHaveProperty('id');
    expect(responseBody[0]).toHaveProperty('name');
});

test('should be able to get a response time below ms1000', async ({ request }) => {
    const url = 'https://rickandmortyapi.com/api/character';
   
    const startTime = Date.now();
    const response = await request.get(url);
    const endTime = Date.now();
   
    const responseBody = await response.json();

    expect(response.status()).toBe(200);
    expect(responseBody.results.length).toBeGreaterThan(0);
    
    const elapsedTime = endTime - startTime;
    expect(elapsedTime).toBeLessThan(1000);
});