import { Employee } from './Employee';

export class Developer extends Employee {
    programmingLanguage: string;

    constructor(name: string, programmingLanguage: string) {
        super(name);
        this.programmingLanguage = programmingLanguage;
    }

    describeAction(): void {
        console.log(`${this.name} is coding in ${this.programmingLanguage}.`);
        const infoDiv = document.getElementById('systemInfo');
        if (infoDiv) {
            infoDiv.innerHTML += `<p class="border-l-2 border-navy pl-2 mt-1">${this.name} is coding in <span class="text-crimson font-bold">${this.programmingLanguage}</span>.</p>`;
        }
    }
}
