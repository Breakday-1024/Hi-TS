//����¼
var Memento = /** @class */ (function () {
    function Memento(state) {
        this.state = state;
    }
    Memento.prototype.setState = function (state) {
        this.state = state;
    };
    Memento.prototype.getState = function () {
        return this.state;
    };
    return Memento;
}());
//������
var Originator = /** @class */ (function () {
    function Originator() {
    }
    Originator.prototype.setState = function (state) {
        this.state = state;
    };
    Originator.prototype.getState = function () {
        return this.state;
    };
    Originator.prototype.createMemento = function () {
        return new Memento(this.state);
    };
    Originator.prototype.restoreMemento = function (m) {
        this.setState(m.getState());
    };
    return Originator;
}());
//������
var Caretaker = /** @class */ (function () {
    function Caretaker() {
    }
    Caretaker.prototype.setMemento = function (m) {
        this.memento = m;
    };
    Caretaker.prototype.getMemento = function () {
        return this.memento;
    };
    return Caretaker;
}());
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.main = function () {
        var or = new Originator();
        var cr = new Caretaker();
        or.setState("S0");
        console.log("��ʼ״̬:" + or.getState());
        cr.setMemento(or.createMemento()); //����״̬      
        or.setState("S1");
        console.log("�µ�״̬:" + or.getState());
        or.restoreMemento(cr.getMemento()); //�ָ�״̬
        console.log("�ָ�״̬:" + or.getState());
    };
    return Client;
}());
Client.main();
// ��ʼ״̬:S0
// �µ�״̬:S1
// �ָ�״̬:S0
