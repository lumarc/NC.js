"use strict";
var StepNC = require('../../../../../STEPNode/build/Release/StepNC');
var file = require('./file');
var _ = require('lodash');
var tol = file.tol;
var apt = file.apt;
var find = file.find;

var GetWorkingstepsForTolerance = function(exe, tolId) {
    if (find.IsWorkingstep(exe)) {
        let allTols = tol.GetWorkingstepToleranceAll(exe);
        if (_.indexOf(allTols, tolId) !== -1) {
            return [exe];
        }
        else {
            return [];
        }
    }
    else if (find.IsWorkplan(exe) || find.IsSelective(exe)) {
        let rtn = [];
        let children = find.GetNestedExecutableAll(exe);
        if (children !== undefined) {
            _.each(children, (childId) => {
                rtn = rtn.concat(GetWorkingstepsForTolerance(childId, tolId));
            });
        }
        return rtn;
    }
    else {
        console.log("something's afoot");
        return [];
    }
};

var _getTolerance = function(id) {
  let steps = GetWorkingstepsForTolerance(find.GetMainWorkplan(), id);
  let name = tol.GetToleranceType(id).replace(/_/g, ' ').toLowerCase();
  let tolType = name.split(' ')[0];
  
  return {
      "id":id,
      "type": 'tolerance',
      "name": name,
      "toleranceType": tolType,
      "value": tol.GetToleranceValue(id),
      "workingsteps": steps,
      "unit" : tol.GetToleranceUnit(id),
      "workpiece": tol.GetWorkpieceOfTolerance(id),
  };
};

var _getTols = function(req,res) {
  let tol_list = tol.GetToleranceAll();
  let ret = [];
  for (let id of tol_list){
      ret.push(_getTolerance(id));
  }
  res.status(200).send(ret);
};

var _getWps = function(req,res) {
  let wp_list = find.GetWorkpieceAll();
  let ret = [];
  for (let id of wp_list){
    let type = find.GetWorkpieceType(id);
    let name = find.GetWorkpieceName(id);
    if(type === 'workpiece') {
      let tolerances = tol.GetWorkpieceToleranceAll(id);
      ret.push({
        "id": id,
        "type": "workpiece",
        "name": name,
        "wpType": type,
        "tolerances": tolerances,
      });
    }
  }
  res.status(200).send(ret);
};

var _getWsTols = function(req,res) {
  if (req.params.wsId){
    let wsId = req.params.wsId;
    if (find.IsWorkingstep(wsId)) { // this may be able to be factored out later
      let tolerances = JSON.stringify(tol.GetWorkingstepToleranceAll(wsId));
      console.log("tolerances" + tolerances);
      res.status(200).send(tolerances);
    }
    else {  // we are looking for a tolerance
      let tol = _getTolerance(req.params.wsId);
      res.status(200).send(tol);
    }
  }
};

module.exports = function(app, cb) {
  app.router.get('/v3/nc/tolerances/:wsId',_getWsTols);
  app.router.get('/v3/nc/tolerances/',_getTols);
  app.router.get('/v3/nc/workpieces/',_getWps);

  if (cb) cb();
};