import {defineStore} from 'pinia'

export const useProgramStore = defineStore('program', {
    state: () => ({
        // Visual components
        code: [], // Holds the code snippet
        classAndConstantVariables: [], // Class-Variables and constants (within Method area)
        stackPointer: 0, // points to the top of the memoryStack
        callStack: [], // holds method calls on a stack
        memoryStack: [], // holds variables and references
        heap: [],  // holds objects
        explanation: "", // explanation field -> last gets displayed?
        console: [], // console output field.

        // Programselection
        programs: [], // holds all different programs
        programSelection: 0, // selection within programs list
        programsLoaded: false, // indicates if we have programs in the store
        programPointer: 0, // points to current instruction in a program ( already executed)
        endOfProgram: false,
        startOfProgram: true,
        driverTourCompleted: false
    }),
    getters: {
        /**
         * Checks on whether we have a next step to execute
         * @param state this object
         * @returns {boolean} True for if we have a next. False otherwise.
         */
        hasNext(state) {
            return state.programPointer < state.selectedProgram.steps.length;
        },
        /**
         * Returns the selected program.
         * @param state this object
         * @returns {Object} The object of the program.
         */
        selectedProgram(state) {
            return state.programs[state.programSelection];
        },
        /**
         * gives the instruction pointer within the program code.
         * @param state this object.
         * @returns {int} the current line executed within the program code.
         */
        instructionPointer(state) {
            if (!state.programsLoaded) return 0;
            if (state.programPointer === state.selectedProgram.steps.length - 1) {
                return state.selectedProgram.steps[state.programPointer].codeLine;
            } else return state.selectedProgram.steps[state.programPointer + 1].codeLine;
        },
        currentLineExecuted(state) {
            if (!state.programsLoaded) return 0;
            return state.selectedProgram.steps[state.programPointer].codeLine;
        },

    },
    actions: {
        /**
         * selects a program out of the list of possible programs.
         * @param index the index within the list of programs of the one to be selected.
         */
        selectProgram(index) {
            this.reset()
            if (this.programs[index] != null) {
                this.programSelection = index;
            } else {
                throw new Error('Selected Program doesn\'t exist.');
            }
        },
        /**
         * Loads the programs initially from the jsonfile.
         * @returns {Promise<void>} not of interest
         */
        async loadPrograms() {
            try {
                const response = await fetch(`${process.env.BASE_URL}programs.json`);
                this.programs = await response.json();  // Load the programs into the state
                this.programsLoaded = true;
            } catch (error) {
                console.error('Error loading programs:', error);
            }
        },
        /**
         * Moves one step further and executes that step.
         *
         */
        nextStep() {
            if (!this.hasNext || this.endOfProgram) return;
            this.startOfProgram = false;
            this.handleStep(this.selectedProgram.steps[this.programPointer]);
            this.explanation = this.selectedProgram.steps[this.programPointer].explanation;
            if (this.programPointer === this.selectedProgram.steps.length - 1) {
                this.endOfProgram = true;
            } else {
                this.programPointer++;
            }
        },
        /**
         * Reverses the current step and goes back one.
         */
        previousStep() {
            if (this.startOfProgram) return;

            if (!this.endOfProgram) this.programPointer--;

            if (this.programPointer === 0) this.startOfProgram = true;

            this.endOfProgram = false;
            this.handleStep(this.selectedProgram.steps[this.programPointer], true);
            this.explanation = (this.programPointer - 1) >= 0?this.selectedProgram.steps[this.programPointer - 1].explanation: "";
        },

        /**
         * Executes a step in a direction. Default is forward
         * @param step the step to execute
         * @param reversed whether it should be reversed, meaning undone.
         */
        handleStep(step, reversed = false) {
            step.instructions.forEach((instruction) => {
                if (instruction.type === 'callStack') {
                    this.handleCallStack(instruction, reversed);
                } else if (instruction.type === 'memStack') {
                    this.handleMemoryStack(instruction, reversed);
                } else if (instruction.type === 'heap') {
                    this.handleHeap(instruction, reversed);
                } else if (instruction.type === 'console') {
                    this.handleConsole(instruction, reversed);
                } else if (instruction.type === 'constant') {
                    this.handleConstants(instruction, reversed);
                }
            })
        },

        handleConstants(instruction, reverse) {
            if (instruction.action === 'push' && !reverse || instruction.action === 'pop' && reverse) {
                this.classAndConstantVariables.push(instruction.payload)
            } else if (instruction.action === 'pop' && !reverse || instruction.action === 'push' && reverse) {
                const index = this.callStack.indexOf(instruction.payload);
                this.classAndConstantVariables.splice(index, 1)[0];
            } else {
                throw new Error('unkown action on callStack: ' + instruction.action);
            }
        },

        /**
         * Executes an instruction on the Callstack. Writes into the call-stack list.
         * @param instruction the instruction to execute following the schema.
         * @param reverse if the instruction should be reversed, meaning be undone. Default is false.
         */
        handleCallStack(instruction, reverse = false) {
            if (instruction.action === 'push' && !reverse || instruction.action === 'pop' && reverse) {
                this.callStack.push(instruction.payload)
            } else if (instruction.action === 'pop' && !reverse || instruction.action === 'push' && reverse) {
                const index = this.callStack.indexOf(instruction.payload);
                this.callStack.splice(index, 1)[0];
            } else {
                throw new Error('unkown action on callStack: ' + instruction.action);
            }
        },
        /**
         * Executes an instruction on the memory stack. Writes into the memory-stack list.
         * @param instruction the instruction to execute following the schema.
         * @param reverse if the instruction should be reversed, meaning be undone. Default is false.
         */
        handleMemoryStack(instruction, reverse = false) {
            if (instruction.action === 'push' && !reverse || instruction.action === 'pop' && reverse) {
                this.memoryStack.push(instruction.payload);
                this.stackPointer++;
            } else if (instruction.action === 'pop' && !reverse || instruction.action === 'push' && reverse) {
                const index = this.memoryStack.indexOf(instruction.payload);
                this.memoryStack.splice(index, 1)[0];
                this.stackPointer--;


            } else {
                throw new Error('unkown action on memoryStack: ' + instruction.action);
            }
        },
        /**
         * Executes an instruction on the heap. Writes into the heap list.
         * @param instruction the instruction to execute following the schema.
         * @param reverse if the instruction should be reversed, meaning be undone. Default is false.
         */
        handleHeap(instruction, reverse = false) {
            if (instruction.action === 'push' && !reverse || instruction.action === 'pop' && reverse) {
                this.heap.push(instruction.payload)
            } else if (instruction.action === 'pop' && !reverse || instruction.action === 'push' && reverse) {
                const index = this.heap.indexOf(instruction.payload);
                this.heap.splice(index, 1)[0];
            } else {
                throw new Error('unkown action on heap: ' + instruction.action);
            }
        },
        /**
         * Executes instruction on the console. Writes the output into the console list.
         * @param instruction the instruction to execute following the schema.
         * @param reverse if the instruction should be reversed, meaning be undone. Default is false.
         */
        handleConsole(instruction, reverse = false) {
            if (instruction.action === 'push' && !reverse || instruction.action === 'pop' && reverse) {
                this.console.push(instruction.payload)
            } else if (instruction.action === 'pop' && !reverse || instruction.action === 'push' && reverse) {
                this.console.pop();
            } else {
                throw new Error('unkown action on callStack: ' + instruction.action);
            }
        },
        /**
         * Resets the program to initial state.
         */
        reset() {
            this.callStack = [];
            this.memoryStack = [];
            this.heap = [];
            this.programPointer = 0;
            this.explanation = "";
            this.console = [];
            this.code = []
            this.classAndConstantVariables = [];
            this.stackPointer = 0;
            this.endOfProgram = false;
            this.startOfProgram = true;
        }

    }
})