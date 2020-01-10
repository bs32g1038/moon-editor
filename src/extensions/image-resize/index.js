import { Node } from 'tiptap';

export default class ImageResize extends Node {
    get name() {
        return 'imageResize';
    }

    get schema() {
        return {
            inline: true,
            attrs: {
                src: {
                    default: null,
                },
                alt: {
                    default: null,
                },
                title: {
                    default: null,
                },
                width: {
                    default: null,
                },
                height: {
                    default: null,
                },
            },
            group: 'inline',
            draggable: true,
            parseDOM: [
                {
                    tag: 'img[src]',
                    getAttrs: dom => {
                        return {
                            src: dom.getAttribute('src'),
                            title: dom.getAttribute('title'),
                            alt: dom.getAttribute('alt'),
                            width: dom.getAttribute('width'),
                            height: dom.getAttribute('height'),
                        };
                    },
                },
            ],
            toDOM: node => {
                return [
                    'img',
                    {
                        ...node.attrs,
                    },
                ];
            },
        };
    }

    commands({ type }) {
        return attrs => (state, dispatch) => {
            const { selection } = state;
            const transaction = state.tr.replaceWith(
                selection.from,
                selection.to,
                type.create({
                    ...selection.node.attrs,
                    ...attrs,
                })
            );
            dispatch(transaction);
        };
    }
}
