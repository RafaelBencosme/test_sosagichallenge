import { test, expect } from "@playwright/test";

test("should be able to fetch details of all characters", async ({
  request,
}) => {
  const response = await request.get(
    "https://rickandmortyapi.com/api/character"
  );
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(Array.isArray(body.results)).toBe(true);
  expect(body.results.length).toBeGreaterThan(0);
  expect(body.results[0]).toHaveProperty("id");
  expect(body.results[0]).toHaveProperty("name");
});

test("should be able to fetch details of an existing character", async ({
  request,
}) => {
  const response = await request.get(
    "https://rickandmortyapi.com/api/character/5"
  );
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.id).toBe(5);
  expect(body.name).toBe("Jerry Smith");
});

test("should be able to fetch details from multiple characters", async ({
  request,
}) => {
  const response = await request.get(
    "https://rickandmortyapi.com/api/character/1,3,6"
  );
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body).toBeInstanceOf(Array);
  expect(body.length).toBeGreaterThan(0);
  expect(body[0]).toHaveProperty("id");
  expect(body[0]).toHaveProperty("name");
});

test("should be able to get a response time below 1000ms", async ({
  request,
}) => {
  const startTime = Date.now();
  const response = await request.get(
    "https://rickandmortyapi.com/api/character"
  );
  const endTime = Date.now();

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.results.length).toBeGreaterThan(0);

  const elapsedTime = endTime - startTime;
  expect(elapsedTime).toBeLessThan(1000);
});

test("should be able to produce error 404 on invalid request", async ({
  request,
}) => {
  const response = await request.get(
    "https://rickandmortyapi.com/api/character/99999"
  );
  const body = await response.json();

  expect(response.status()).toBe(404);
  expect(body.error).toContain("Character not found");
});