function translate(key: string, options: object) {
  // 获取 `options` 对象的深层属性
  // 使用 `key` 作为索引
  console.log(key.split("."), ' key.split(".")');
  return key.split(".").reduce((o, i) => {
    if (o) {
      return (o as object)[i];
    }
  }, options);
}
console.log(
  translate("greetings.hello", {
    greetings: {
      hello: "Bonjour!qq",
    },
  })
);
//单例模式
class mysqlConnet {
  protected static i: mysqlConnet | null = null;
  private id: number = 0;
  static instance(): mysqlConnet {
    if (!mysqlConnet.i) {
      mysqlConnet.i = new mysqlConnet();
    }
    return mysqlConnet.i;
  }
  constructor() {
    this.id = Math.random();
  }
  getID(): number {
    console.log(this.id);
    return this.id;
  }
}
let is = [
  mysqlConnet.instance(),
  mysqlConnet.instance(),
  mysqlConnet.instance(),
];
is.forEach((element) => {
  element.getID();
});

//工厂模式
interface Vehicle {
  move(): void;
}

class Car implements Vehicle {
  public move(): void {
    console.log("Moving the car!");
  }
}

class Bicycle implements Vehicle {
  public move(): void {
    console.log("Moving the bicycle!");
  }
}

class Plane implements Vehicle {
  public move(): void {
    console.log("Flying the plane!");
  }
}
let vehicleMove = function (vehicle: Vehicle) {
  vehicle.move();
};

// let c = new Car();
// let b = new Bicycle();
// let p = new Plane();
// vehicleMove(c);
// vehicleMove(b);
// vehicleMove(p);

// VehicleHandler 是“抽象的”，因为没有人会实例化它instantiate it
// 我们要扩展它并实现抽象方法
abstract class VehicleHandler {
  // 这是真正的处理程序需要实现的方法
  public abstract createVehicle(): Vehicle;

  public moveVehicle(): void {
    const myVehicle = this.createVehicle();
    myVehicle.move();
  }
}

class PlaneHandler extends VehicleHandler {
  public createVehicle(): Vehicle {
    return new Plane();
  }
}

class CarHandler extends VehicleHandler {
  public createVehicle(): Vehicle {
    return new Car();
  }
}

class BicycleHandler extends VehicleHandler {
  public createVehicle(): Vehicle {
    return new Bicycle();
  }
}

/// User code...
const planes = new PlaneHandler();
const cars = new CarHandler();

planes.moveVehicle();
cars.moveVehicle();

//觀察者模式

type InternalState = {
  event: String;
};

abstract class Observer {
  abstract update(state: InternalState): void;
}

abstract class Observable {
  protected observers: Observer[] = [];
  protected state: InternalState = { event: "" };

  public addObserver(o: Observer): void {
    this.observers.push(o);
  }

  protected notify() {
    this.observers.forEach((o) => o.update(this.state));
  }
}

class ConsoleLogger extends Observer {
  public update(newState: InternalState) {
    console.log("New internal state update: ", newState);
  }
}

class InputElement extends Observable {
  public click(): void {
    this.state = { event: "click" };
    this.notify();
  }
}

const input = new InputElement();
input.addObserver(new ConsoleLogger());

input.click();

//装饰模式

abstract class Animal {
  abstract move(): void;
}

abstract class SuperDecorator extends Animal {
  protected comp: Animal;

  constructor(decoratedAnimal: Animal) {
    super();
    this.comp = decoratedAnimal;
  }

  abstract move(): void;
}

class Dog extends Animal {
  public move(): void {
    console.log("Moving the dog...");
  }
}

class SuperAnimal extends SuperDecorator {
  public move(): void {
    console.log("Starts flying...");
    this.comp.move();
    console.log("Landing...");
  }
}

class SwimmingAnimal extends SuperDecorator {
  public move(): void {
    console.log("Jumps into the water...");
    this.comp.move();
  }
}

const dog = new Dog();

console.log("--- Non-decorated attempt: ");
dog.move();

console.log("--- Flying decorator --- ");
const superDog = new SuperAnimal(dog);
superDog.move();

console.log("--- Now let's go swimming --- ");
const swimmingDog = new SwimmingAnimal(dog);
swimmingDog.move();

//composite (组合)

interface IProduct {
  getName(): string;
  getPrice(): number;
}

class Product implements IProduct {
  private price: number;
  private name: string;
  private name1: string;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  public getPrice(): number {
    return this.price;
  }

  public getName(): string {
    return this.name;
  }
}

class Box implements IProduct {
  private products: IProduct[] = [];

  contructor() {
    this.products = [];
  }

  public getName(): string {
    return "A box with " + this.products.length + " products";
  }

  add(p: IProduct): void {
    console.log("Adding a ", p.getName(), "to the box");
    this.products.push(p);
  }

  getPrice(): number {
    return this.products.reduce(
      (curr: number, b: IProduct) => curr + b.getPrice(),
      0
    );
  }
}

//Using the code...
const box1 = new Box();
box1.add(new Product("Bubble gum", 0.5));
box1.add(new Product("Samsung Note 20", 1005));

const box2 = new Box();
box2.add(new Product("Samsung TV 20in", 300));
box2.add(new Product("Samsung TV 50in", 800));

box1.add(box2);

console.log("Total price: ", box1.getPrice());
