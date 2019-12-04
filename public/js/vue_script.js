'use strict';
var socket = io();

var vm = new Vue({
    el: '#myburgers',
    data: {//initializing values
        burgers: burgers,
        x: -20,
        y: -20,//to get the dot offscreen initially
        chosenBurger: [],
        name: "",
        mail: "",
        pay: "Swish",
        gender: "",
        //orderList: "",
        orders: {},
        details: "",
    },

    methods: {
        getNext: function () {
            var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
                return Math.max(last, next);
            }, 0);
            return lastOrder + 1;
        },
        addOrder: function (event) {
            //this.orderList = "Order summary: "this.chosenBurger", ";
            socket.emit("addOrder", {
                orderId: this.getNext(),
                details: {
                    x: this.x,
                    y: this.y
                },
                orderItems: this.chosenBurger,
                orderName: this.name,
                orderMail: this.mail,
                orderPay: this.pay,
                orderGender: this.gender,
            });
        },
        displayOrder: function (event) {
            this.x =  event.clientX - 10 - event.currentTarget.getBoundingClientRect().left;
            this.y = event.clientY - 10 - event.currentTarget.getBoundingClientRect().top;
        }
    }

});