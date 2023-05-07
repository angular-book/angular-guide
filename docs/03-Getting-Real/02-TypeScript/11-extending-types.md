# Extending Interfaces or Types

Let's say you have two things - an employee and a retiree.
Both are a person, one has a salary, one has a pension.

```ts
type Person = {
  name: string;
};

type Employee = Person & {
  salary: number;

  pension?: never;
};

type Retiree = Person & {
  pension: number;

  salary?: never;
};

type Worker = Employee | Retiree;

const joe: Worker = {
  name: "Joe Smith",

  salary: 50000, //  pension: 30000
};

function giveRaise(w: Worker): Worker {
  if (w.pension) {
    return {
      ...w,

      pension: w.pension * 1.1,
    } as Retiree;
  } else {
    return {
      ...w,

      salary: w.salary * 1.1,
    } as Employee;
  }
}
```

### Tagged Union Types and Switch

```ts
type SuccessResult<T> = {
  status: "OK";

  value: T;
};

type ErrorResult = {
  status: "FAIL";

  message: string;
};

type MaybeResult = {
  status: "Maybe";
};

type Result<T> = SuccessResult<T> | ErrorResult; // add MaybeResult here
const r1: Result<string> = {
  status: "OK",

  value: "Tacos",
};

const r2: Result<string> = {
  status: "FAIL",

  message: "Fail whale!",
};

function handleIt(h: Result<string>) {
  switch (h.status) {
    case "OK": {
      return "It is ok, and has " + h.value;
    }

    case "FAIL": {
      return "It failed with message" + h.message;
    }

    default: {
      const x: never = h;
    }
  }
}
```
