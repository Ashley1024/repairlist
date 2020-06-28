const enterele = document.querySelector(".new-repair");
const menuele = document.querySelector('.repair-list ');
const checkele = document.querySelector('.toggle');
const viewele = document.querySelectorAll('.view');
const clearCompletedele = document.querySelector(".clear-completed");


class RepairList {
  constructor() {
    this.repairs = [];

    //count is used to remember id of every description
    this.count = 0;
    this.redraw();

  }
  addRepair() {
    //copy of repair, or there will still be same repair 
    let objCopy = Object.assign({}, repair);

    //todo generate unique id
    objCopy.id = this.count++;

    this.repairs.push(objCopy);
    console.log(this.repairs);
    this.redraw();

  }

  redraw() {
    menuele.innerHTML = "";

    this.repairs.forEach(function (repair) {
      let ifcheck = "";
      if (repair.completed == "completed") {
        ifcheck = "checked";
      }

      menuele.insertAdjacentHTML('afterbegin', `
      <li data-id="${repair.id}" class="${repair.completed}">
            <div class="view">
              <input class="toggle" type="checkbox" ${ifcheck} >
              <label>${repair.description}</label>
              <button class="destroy"></button>
            </div>
      </li>`
      );
    });

    //todo after insert, remove the element in input window;
    enterele.value = "";
  };

  deleteRepair(delid) {

    let repairIndex = this.repairs.findIndex(item => item.id == delid);
    this.repairs.splice(repairIndex, 1);
    console.log(this.repairs);
    this.redraw();

  };

  markAsComplete(completedId) {

    let change = this.repairs.findIndex(repair => repair.id === completedId);
    if (this.repairs[change].completed === false) {
      this.repairs[change].completed = "completed";
    } else {
      this.repairs[change].completed = false;
    }
    console.log(this.repairs);
    this.redraw();
  };

  clearCompleted() {
    let completedarr = [];
    this.repairs.forEach(repair => {
      if (repair.completed === "completed") {
        completedarr.push(repair.id);
      }
    });

    completedarr.forEach(id => {
      repairlist.deleteRepair(id);
    });

    console.log(completedarr);
    this.redraw();

  };

}

let repairlist = new RepairList();


// represents an individual repair job,
class Repair {
  constructor(description, completedcheck) {
    this.description = description;
    this.completed = completedcheck;
  }
}
let repair = new Repair();



//todo onkeydown to check what we enter before press key enter
checkInfo = function (event) {
  let description = "";
  if (event.keyCode == 13) {
    event.cancleBubble = true;
    event.returnValue = false;
    description = enterele.value;
    repair.description = description;
    repair.completed = false;
    repairlist.addRepair(description);
    return description;
  }
}

//todo event listener for clear all marked
clearCompletedele.addEventListener('click', function () {
  repairlist.clearCompleted();
})

menuele.addEventListener('click', function (e) {
  //todo event for delete specific item
  if (e.target.nodeName === "BUTTON") {
    const descriptionEle = e.target.closest('li');
    // print id,be careful about courseId no -
    let id = descriptionEle.getAttribute("data-id");

    //*or get attribute - is ok
    repairlist.deleteRepair(id)
  };

  //todo event for add completed mark
  if (e.target.nodeName === "INPUT") {
    const completedEle = e.target.closest('li');
    let completedId = completedEle.getAttribute('data-id');
    completedId = parseInt(completedId);
    repairlist.markAsComplete(completedId);
  }

})