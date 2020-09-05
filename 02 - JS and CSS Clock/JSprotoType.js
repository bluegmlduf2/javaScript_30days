/**
 * 프로토타입의 이점
 * 1.성능향상,객체지향
 * 2.커스터마이징 가능 (아래의 예제) <---내가 자주 사용 할 경우라고 생각함 
 * 
 * 프로토타입개념
 * 1.해당 객체안에 있는 prototype이 new()로 호출할 경우 가장 먼저 실행된다(prototype상속)
 */

/***************************************************
 * 
 * 실사용 프로토타입 예제
 * 
 ***************************************************/
//1.기존에 String객체에 커스터마이징한 함수(lpad)를 추가한다.
//LPAD구현 //String 객체를 사용할 때(정의가아니라사용) 사용할 lpad객체를 만든다 스트링객체.lpad하면 이 함수가 실행된다. 이해됨!
    String.prototype.lpad = function (padString, padLength) {
        var s = this; //해당 this는 lpad를 호출한 String변수(객체)를 가리킨다.//여기선 hours,minutes,seconds
        while (s.length < padLength)
            s = padString + s;
        return s;
    }

    //2. String객체.lpad()로 앞 서 커스터마이징한 함수를 호출한다.
    digitalClock.textContent=`${hours.toString().lpad('0',2)}`;

/***************************************************
 * 
 * 생활코딩 프로토타입 예제
 * 
 * 객체안에 함수를 넣는것보다 프로토타입으로 빼는게 좋다.
 ***************************************************/
    function Person(name, first, second, third){
        this.name=name;
        this.first=first;
        this.second=second;   
        /*아래의 함수를 사용하는 경우 매번 new Person()으로 호출할때마다 해당 함수를 정의해서 메모리 낭비가 엄청나다(1억개의 new()가 있을경우 가정)
         this.sum = function(){
             return 'prototype : '+(this.first+this.second);
        }*/    
    }
     
    /*그러나 아래와 같이 객체.prototype.함수 로 사용할 경우에 정의 할때마다 메모리에 저장하지않고
     kim.sum(); 처럼 사용 할 때만 정의해서 메모리를 사용한다. 그러므로 성능에 이점  */
    Person.prototype.sum = function(){
        return 'prototype : '+(this.first+this.second);
    }
     
    var kim = new Person('kim', 10, 20);
    /* 또한 해당 객체를 아래와같이 커스터마이징 가능하다 */
    kim.sum = function(){
        return 'this : '+(this.first+this.second);
    }
    var lee = new Person('lee', 10, 10);
    console.log("kim.sum()", kim.sum());
    console.log("lee.sum()", lee.sum());