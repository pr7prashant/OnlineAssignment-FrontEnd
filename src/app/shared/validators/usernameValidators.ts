import { AbstractControl } from "@angular/forms";

export class UsernameValidators {
    static cannotContainSpace(name: AbstractControl) {
        if(name.value.indexOf(' ') >= 0)
            return { cannotContainSpace: true };

        return null;
    }
}