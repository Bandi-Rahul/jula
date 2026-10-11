import assert from "node:assert/strict";
import test from "node:test";
import {
  acceptanceSchema,
  boundedJson,
  enquirySchema,
} from "../src/lib/enquiries";

const valid = {
  kind: "general",
  name: "A customer",
  email: "person@example.com",
  subject: "General question",
  message: "I would like to ask about your tea development.",
  privacy: true,
};
test("enquiries validate required fields without inventing consent", () => {
  assert.equal(enquirySchema.safeParse(valid).success, true);
  assert.equal(
    enquirySchema.safeParse({ ...valid, email: "not-an-email" }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, privacy: false }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, message: "too short" }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({ ...valid, kind: "professional" }).success,
    false,
  );
  assert.equal(
    enquirySchema.safeParse({
      ...valid,
      kind: "professional",
      company: "Example hotel",
    }).success,
    true,
  );
});
test("newsletter signup requires explicit opt-in", () => {
  assert.equal(
    enquirySchema.safeParse({
      kind: "newsletter",
      email: "person@example.com",
      consent: true,
    }).success,
    true,
  );
  assert.equal(
    enquirySchema.safeParse({
      kind: "newsletter",
      email: "person@example.com",
      consent: false,
    }).success,
    false,
  );
});
test("upstream acceptance requires an actual acknowledgement", () => {
  assert.equal(
    acceptanceSchema.safeParse({ accepted: true, id: "request-123" }).success,
    true,
  );
  assert.equal(acceptanceSchema.safeParse({ ok: true }).success, false);
  assert.equal(
    acceptanceSchema.safeParse({ accepted: false, id: "request-123" }).success,
    false,
  );
});
test("request bodies are bounded before parsing", async () => {
  const request = new Request("https://example.test", {
    method: "POST",
    body: JSON.stringify(valid),
  });
  assert.deepEqual(await boundedJson(request), valid);
  await assert.rejects(
    boundedJson(
      new Request("https://example.test", {
        method: "POST",
        body: "x".repeat(100),
      }),
      20,
    ),
    /too-large/,
  );
});
