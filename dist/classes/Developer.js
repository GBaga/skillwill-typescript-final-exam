"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Developer = void 0;
const Employee_1 = require("./Employee");
class Developer extends Employee_1.Employee {
    constructor(name, programmingLanguage) {
        super(name);
        this.programmingLanguage = programmingLanguage;
    }
    describeAction() {
        console.log(`${this.name} is coding in ${this.programmingLanguage}.`);
        const infoDiv = document.getElementById('systemInfo');
        if (infoDiv) {
            infoDiv.innerHTML += `<p class="border-l-2 border-navy pl-2 mt-1">${this.name} is coding in <span class="text-crimson font-bold">${this.programmingLanguage}</span>.</p>`;
        }
    }
}
exports.Developer = Developer;
