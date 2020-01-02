<template>
    <div class="editor">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <div class="menubar">
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                    :data-tooltip="$t('message.bold')"
                >
                    <BoldIcon />
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                    :data-tooltip="$t('message.italic')"
                >
                    <ItalicIcon />
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.strike() }"
                    @click="commands.strike"
                    :data-tooltip="$t('message.strike')"
                >
                    <StrikeIcon />
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.underline() }"
                    @click="commands.underline"
                    :data-tooltip="$t('message.underline')"
                >
                    <UnderlineIcon />
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code() }"
                    @click="commands.code"
                    :data-tooltip="$t('message.code')"
                >
                    <CodeIcon />
                </button>
                <button class="menubar__button" :data-tooltip="$t('message.image')" @click="uploadFn(commands.image)">
                    <ButtonImageIcon />
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code() }"
                    @click="commands.code"
                    :data-tooltip="$t('message.code')"
                >
                    <TextIndentLeftIcon />
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code() }"
                    @click="commands.code"
                    :data-tooltip="$t('message.code')"
                >
                    <TextIndentRightIcon />
                </button>

                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                    @click="commands.heading({ level: 1 })"
                    :data-tooltip="$t('message.h1')"
                >
                    <span>H1</span>
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                    @click="commands.heading({ level: 2 })"
                    :data-tooltip="$t('message.h2')"
                >
                    <span>H2</span>
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                    @click="commands.heading({ level: 3 })"
                    :data-tooltip="$t('message.h3')"
                >
                    <span>H3</span>
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.bullet_list() }"
                    @click="commands.bullet_list"
                    :data-tooltip="$t('message.bullet_list')"
                >
                    <UlIcon></UlIcon>
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.ordered_list() }"
                    @click="commands.ordered_list"
                    :data-tooltip="$t('message.ordered_list')"
                >
                    <OlIcon />
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.blockquote() }"
                    @click="commands.blockquote"
                    :data-tooltip="$t('message.blockquote')"
                >
                    <QuoteIcon />
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.code_block() }"
                    @click="commands.code_block"
                    :data-tooltip="$t('message.code_block')"
                >
                    <CodeBlockIcon />
                </button>
                <button
                    class="menubar__button"
                    :class="{ 'is-active': isActive.link() }"
                    :data-tooltip="$t('message.link')"
                    :disabled="disabledLinkButton"
                    @click="
                        isShowLinkDialog = true;
                        gCmds = commands;
                    "
                >
                    <LinkIcon />
                </button>
                <button
                    class="menubar__button"
                    @click="commands.horizontal_rule"
                    :data-tooltip="$t('message.horizontal_rule')"
                >
                    <HrIcon />
                </button>
                <button class="menubar__button" @click="commands.undo" :data-tooltip="$t('message.undo')">
                    <UndoIcon />
                </button>
                <button class="menubar__button" @click="commands.redo" :data-tooltip="$t('message.redo')">
                    <RedoIcon />
                </button>
            </div>
        </editor-menu-bar>
        <div class="content-wrap">
            <LinkDialog
                v-if="isShowLinkDialog"
                :title="$t('message.link')"
                @cancel="isShowLinkDialog = false"
                @ok="ok"
            ></LinkDialog>
            <div @click="onContentClickEventDelegation">
                <editor-content class="editor__content" :editor="editor" />
            </div>
        </div>
    </div>
</template>

<script>
import 'whatwg-fetch';

import BoldIcon from '../icon/bold';
import ItalicIcon from '../icon/italic';
import StrikeIcon from '../icon/strike';
import OlIcon from '../icon/ol';
import UlIcon from '../icon/ul';
import UndoIcon from '../icon/undo';
import UnderlineIcon from '../icon/underline';
import RedoIcon from '../icon/redo';
import CodeIcon from '../icon/code';
import HrIcon from '../icon/hr';
import QuoteIcon from '../icon/quote';
import CodeBlockIcon from '../icon/code-block';
import LinkIcon from '../icon/link';
import TextIndentLeftIcon from '../icon/indent-left';
import TextIndentRightIcon from '../icon/indent-right';
import ButtonImageIcon from '../icon/image';
import LinkDialog from '../link-dialog';
// import imageURL from '../../../example/test.jpg';

import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Image,
    Strike,
    Underline,
    History,
} from 'tiptap-extensions';

export default {
    props: {
        content: {
            type: String,
            default: '',
        },
        isImageBase64: {
            type: Boolean,
            required: this,
            default: true,
        },
        uploadServer: {
            url: {
                type: String,
            },
            method: {
                type: String,
                default: 'post',
            },
        },
    },
    components: {
        EditorContent,
        EditorMenuBar,
        BoldIcon,
        ItalicIcon,
        StrikeIcon,
        OlIcon,
        UndoIcon,
        UnderlineIcon,
        UlIcon,
        RedoIcon,
        CodeIcon,
        HrIcon,
        CodeBlockIcon,
        QuoteIcon,
        LinkIcon,
        LinkDialog,
        ButtonImageIcon,
        TextIndentLeftIcon,
        TextIndentRightIcon,
    },
    data() {
        return {
            disabledLinkButton: true,
            isShowLinkDialog: false,
            gCmds: null,
            editor: null,
            defaultOptions: {
                ...this.$props,
            },
        };
    },
    mounted() {
        this.editor = new Editor({
            extensions: [
                new Blockquote(),
                new BulletList(),
                new CodeBlock(),
                new HardBreak(),
                new Heading({ levels: [1, 2, 3] }),
                new HorizontalRule(),
                new ListItem(),
                new OrderedList(),
                new TodoItem(),
                new TodoList(),
                new Link(),
                new Bold(),
                new Code(),
                new Italic(),
                new Image(),
                new Strike(),
                new Underline(),
                new History(),
            ],
            onInit: () => {},
            onTransaction: ({ state }) => {
                const from = state.selection.from;
                const to = state.selection.to;
                if (to - from > 0) {
                    this.disabledLinkButton = false;
                } else {
                    this.disabledLinkButton = true;
                }
            },
            content: this.content,
        });
    },
    methods: {
        ok(link) {
            this.gCmds.link({ href: link });
            this.isShowLinkDialog = false;
        },
        onContentClickEventDelegation: e => {
            if (e.target.nodeName.toLowerCase() == 'img') {
                console.log('img');
            }
        },
        uploadFn(command) {
            const $input = document.createElement('input');
            $input.setAttribute('type', 'file');
            $input.setAttribute('name', 'file');
            $input.setAttribute('accept', 'image/jpg, image/gif, image/png, image/jpeg');
            $input.onchange = () => {
                const data = new FormData();
                data.append('file', $input.files[0]);
                if (this.defaultOptions.isImageBase64) {
                    const reader = new FileReader();
                    reader.onload = function() {
                        const imgBase = reader.result; //这个就是base64的编码
                        command({ src: imgBase });
                    };
                    return reader.readAsDataURL($input.files[0]);
                }
                fetch(this.defaultOptions.uploadServer.url, {
                    method: this.defaultOptions.uploadServer.method,
                    body: data,
                })
                    .then(res => res.json())
                    .then(data => {
                        command({ src: data.src });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            };
            $input.click();
        },
    },
    beforeDestroy() {
        this.editor.destroy();
    },
};
</script>

<style lang="scss" scoped>
.content-wrap {
    position: relative;
}
</style>
