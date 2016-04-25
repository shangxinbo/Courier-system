

'use strict';

const Customer = require('../models/Customer');
const FN = require('../classes/functions');

exports.list = function (req, res) {
    let page = req.query.page ? req.query.page : 1;
    page--;
    let pageNum = 15;

    Customer.getLists( page * pageNum, pageNum, function (err, doc) {
        Customer.count({},function(err,count){
            res.render('customer/list', {
                title: '客户管理',
                customers: doc,
                pages: {
                    current: parseInt(page) + 1,
                    total : Math.ceil(count/pageNum)
                },
                FN : FN
            });
        });
    });
};

exports.add = function (req, res) {
    let name = req.query.name;
    let tel = req.query.tel;
    let time = new Date().getTime();
    let town = req.query.town;

    if(name && FN.isRealPhone(tel)){
        Customer.add({
            name: name,
            tel: tel,
            town: town ? town : 1,   // default '菜园村'
            useful: 1,
            join_time: time,
            last_time: time
        },function(err,data){
            if (data) {
                res.send(FN.resData(0, '添加成功', data));
            }else{
                res.send(FN.resData(1, err.toString()));
            }
        });
    }else{
        res.send(FN.resData(1, '参数格式不正确，添加失败'));
    }
};

exports.del = function (req, res) {
    let arr = req.query.arr;
    if(arr.length){
        Customer.delByIdArr(arr,function(err,data){
            if(data){
                res.send(FN.resData(0, '删除成功'));
            }else{
                res.send(FN.resData(1, err.toString()));
            }
        });
    }else {
        res.send(FN.resData(2, '没有指定可删除的数据id'));
    }

};

exports.edit = function(req,res){
    let getId = req.query.id;
    let postId = req.body.id;
    if(getId){
        Customer.findById(getId,function(err,doc){
            res.render('customer/edit',{data:doc});
        });
    }else{
        if(postId){

        }else{
            
        }
    }
    
};









