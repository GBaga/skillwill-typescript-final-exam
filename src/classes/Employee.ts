export class Employee {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    logName(): void {
        console.log(`Employee Name: ${this.name}`);
        // Also log to the DOM element if available
        const infoDiv = document.getElementById('systemInfo');
        if (infoDiv) {
            infoDiv.innerHTML += `<p class="border-l-2 border-crimson pl-2 mt-1">Employee created: <strong>${this.name}</strong></p>`;
        }
    }
}
