"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(name) {
        this.name = name;
    }
    logName() {
        console.log(`Employee Name: ${this.name}`);
        // Also log to the DOM element if available
        const infoDiv = document.getElementById('systemInfo');
        if (infoDiv) {
            infoDiv.innerHTML += `<p class="border-l-2 border-crimson pl-2 mt-1">Employee created: <strong>${this.name}</strong></p>`;
        }
    }
}
exports.Employee = Employee;
