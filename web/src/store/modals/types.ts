export type OpenAppModal = 'add-card' | 'import-json' | 'post-import';

export type ModalsState = {
    openModal: OpenAppModal | null;
};
