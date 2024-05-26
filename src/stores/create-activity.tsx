import type { Question } from "@/services/supabase/actions/professor.types";
import type { Enums } from "database.types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface QuestionStore {
	questions: {
		[key: number]: Question<Enums<"question_type">>;
	};

	getQuestion: (index: number) => Question<Enums<"question_type">>;

	setQuestion: (
		index: number,
		question: Question<Enums<"question_type">>,
	) => void;
	reset: () => void;

	removeResponse: (index: number, responseIndex: number) => void;
}

export const useQuestionsStore = create(
	devtools<QuestionStore>((set, get) => ({
		questions: {},
		getQuestion: (index) => {
			const question = get().questions[index];

			if (question == null) {
				return {
					accept_file: false,
					question: "",
					type: "multiple_option",
					responses: [],
				};
			}

			return question;
		},
		removeResponse: (index, responseIndex) => {
			const question = get().questions[index];

			if (question == null) {
				return;
			}

			set((state) => ({
				questions: {
					...state.questions,
					[index]: {
						...question,
						responses: (question.responses ?? []).filter(
							(_, i) => i !== responseIndex,
						),
					},
				},
			}));
		},
		setQuestion: (index, question) =>
			set((state) => ({
				questions: { ...state.questions, [index]: question },
			})),
		reset: () => set(() => ({ questions: {} })),
	})),
);

interface FileStore {
	files: File[];
	addFiles: (files: File[]) => void;
	getUrlFile: (index: number) => string;
	removeFile: (index: number) => void;
	reset: () => void;
}

export const useFileStore = create(
	devtools<FileStore>((set, get) => ({
		files: [],
		addFiles: (files) =>
			set((state) => ({ files: [...state.files, ...files] })),
		removeFile: (index) =>
			set((state) => ({ files: state.files.filter((_, i) => i !== index) })),
		getUrlFile: (index) => URL.createObjectURL(get().files[index]),
		reset: () => set(() => ({ files: [] })),
	})),
);
