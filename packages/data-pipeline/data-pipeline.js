// Write your package code here!
DataPipe = class DataPipe {
  constructor() {
    this.fetchFunction = undefined;
    this._raw_data = undefined;
    this.steps = [];
    this.state;
    this.processed_data = undefined;
  }

  setFetch(fetchFunction) {
    this.fetchFunction = fetchFunction;
  }

  getState(){
    return this.state;
  }

  addStep(step) {
    this.steps.push(step);
  }

  fetch() {
    this._raw_data = this.fetchFunction();
    this.state = 'data fetched';
  }

  process() {
    if(this.steps.length == 0){this.processed_data = this._raw_data; return '';}

    var res = this.steps[0](this._raw_data);

    if(this.steps.length == 1){this.processed_data = res; return '';}

    var rest_of_steps = this.steps.slice(1, this.steps.length);

    for (let step of rest_of_steps) {
      res = step(res);
    }
    this.processed_data = res;
    this.state = 'data processed';
  }

  getResult (){
    return this.processed_data;
  }

}
