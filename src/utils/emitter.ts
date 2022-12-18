import mitt, { EventType, WildcardHandler } from 'mitt'

type Type = 'setMarkdown'

type Handler = string 

export const emitter = mitt<Record<Type, Handler>>()
