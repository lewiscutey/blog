---
title: TypeScript中的面向对象编程
date: '2019/08/18 19:11:34'
type: post
tag: TypeScript
meta:
  -
    name: description
    content: TypeScript中的面向对象编程
  -
    name: keywords
    content: TypeScript,OOP
---

`TypeScript`就是**一个基于类的面向对象编程语言**。

<!-- more -->

>面向对象也即是OOP(Object Oriented Programming)，是计算机的一种编程架构，OOP的基本原则是计算机是由子程序作用的单个或者多个对象组合而成，包含属性和方法的对象是类的实例，面向对象的基本特性是：封装、继承、多态、抽象。

一直到今天对于JavaScript是否是面向对象的语言定论仍然没有一致的结果，因为JavaScript(ES5)中没有类的概念，而是直接使用对象来实现编程，使用原型来实现继承，一种基于对象和事件驱动的弱类型动态语言。由于这些不一而足的缺点，微软推出了JavaScript的超集语言--**TypeScript**。

## 1. SOLID原则

在早期的软件开发中，开发者通常使用过程式的程序语言编写代码。在过程式的语言中，程序遵循自顶向下的原则开发，并且逻辑都包裹在函数中。当程序员意识到过程式的语言无法提供他们需要的抽象层次、可维护性和复用性时，出现了OOP，并总结了5个OOP开发者需要遵守的原则，以便更容易地创建出可维护和可拓展的系统。

* **单一职责原则(SRP)**：表明软件组件（函数、类、模块）必须专注与单一的任务（只有单一的职责）；
* **开/闭原则(OCP)**：表明软件设计时必须考虑到代码的扩展性，程序的发展必须最少地修改已有的代码（对已有的修改封闭）；
* **里氏替换原则(LSP)**：表明只要继承的是同一个接口，程序里任意一个类都可以被其他对象（应该可以是在不改变程序正确性的前提下被它的子类）所替换；
* **接口隔离原则(ISP)**：表明应该将非常大的接口拆分成一些小的更具体的接口，多个特定客户端接口要好于一个宽泛用途的接口；
* **依赖反转原则（DIP**）：表明一个方法应该遵从依赖于抽象借口而不是一个实例（类的概念）;


## 2. 类

我们用类去描述一个对象或者实例，一个类由名字、属性、方法组成。
```ts
class Person {
  public name: string;
  public surname: string;
  public email: Email;
  constructor(name: string, surname: string, email: Email) {
    this.name = name;
    this.surname = surname;
    this.email = email;
  }
  greet() {
    console.log(`Hi, ${this.name}`);
  }
}

var me : Person = new Person('lewis', 'lewislv', 'lewis@163.com');
```
一个类要遵循单一职责原则（SRP），可以让我们更容易的看出它的作用，进而去扩展它，这样就用到类的封装和抽象的概念；

## 3. 接口
在传统的面向对象的编程中，一个类可以扩展另一个类，也可以实现一个或多个接口；实现一个接口可以被看作是签署了一份协议，必须遵守它的规则。接口的规则是属性和方法的签名，我们必须实现它们；

在TypeScript中接口有两点不同：

* 接口可以扩展其他接口或者类；
* 接口可以定义数据和行为而不只是行为；

```ts
interface UserInterface {
    name: string;
    password: string;
}

var user: UserInterface = {
    name: '',
    password: ''  // 容易遗漏错误性
}
```

## 4. 继承
面向对象编程最重要的特性之一就是可以扩展已有的类，它允许我们创建一个类（子类），从已有的类（父类）上继承所有的属性和方法，子类可以包含父类中没有的属性和方法；
```ts
class Teacher extends Person {
    teach() {
        console.log('Welcome to class!');
    }
}

var teacher = new Teacher('lewis', 'lewislv', 'lewis@163.com');
teacher.teach();
teacher.greet();
```
有时我们希望子类能提供父类中同名方法的特殊实现，可以用保留字`super`达到这个目的。
```ts
class Teacher extends Person {
    public subjects: string [];
    constructor(name: string, surname: string, email: Email) {
        super(name, surname, email);
        this.subjects = subjects;
    }
    greet() {
        super.greet();
        console.log(`I teach ${this.subjects!}`);
    }
}

var teacher = new Teacher('lewis', 'lewislv', 'lewis@163.com');
teacher.teach();
teacher.greet();
```

## 5. 范型类和范型约束

如同范型函数一样，范型类能够帮助我们避免重复代码，有时候我们可能会需要约束范型类，一个可行的解决方案是在范型类或函数内使用typeof操作符来验证参数范型的类型；
```ts
interface MyInterface {
    doSomething();
}
interface MySecondInterface {
    doSomethingElse();
}

class Example<T extends MyInterface, MySecondInterface> {
    private genericProperty: T;
    useT() {
        this.genericProperty.doSomething();
        this.genericProperty.doSomethingElse(); // 编译错误
    }
}
```

## 6. 命名空间
TypeScript提供了命名空间特性，主要用于组织代码，如果在写一个大型应用，这时可以用命名空间包裹那些有联系的接口、类和对象，并使代码更加容易跟踪和理解。
```ts
namespace app {
    export class UserModel {
        // ...
    }
}
```
当声明一个命名空间时，所有实体部分默认都是私有的，可以使用export关键字导出公共部分，也可以在命名空间内声明另一个命名空间；
```ts
namespace app {
    export namescpace models {
        export class UserModel {
            // ...
        }
    }
}
```

## 总结
以上就是TypeScript的一些面向对象编程的概念，TypeScript的好处很明显，在编译时就能检查出很多语法问题而不是在运行时。目前国内使用Typescript的团队并不多，我觉得写出的代码是否易于维护、优雅，不在于用了什么框架、语言，而在于开发者本身，但是不能保证每个人都不犯错，诚然好的框架和语言能间接帮助开发者写出规范的代码，所以如果有一定技术沉淀的团队还是建议早点使用`TypeScript`。