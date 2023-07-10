/**
 * @generated @dxos/echo-typegen src/proto/schema.proto
 **/

import * as dxos_echo_schema from "@dxos/echo-schema";

const schemaJson =
  '{"nested":{"jessmartin":{"nested":{"dxostasks":{"nested":{"Todo":{"options":{"(object)":true},"fields":{"title":{"type":"string","id":1},"completed":{"type":"bool","id":2}}}}}}}}}';

export const schema = dxos_echo_schema.EchoSchema.fromJson(schemaJson);

export type TodoProps = {
  title: string;
  completed: boolean;
};

export class Todo extends dxos_echo_schema.TypedObject<TodoProps> {
  static readonly type = schema.getType("jessmartin.dxostasks.Todo");

  static filter(opts?: Partial<TodoProps>): dxos_echo_schema.TypeFilter<Todo> {
    return Todo.type.createFilter(opts);
  }

  constructor(
    initValues?: Partial<TodoProps>,
    opts?: dxos_echo_schema.TypedObjectOpts
  ) {
    super({ ...initValues }, Todo.type, opts);
  }
  declare title: string;
  declare completed: boolean;
}

schema.registerPrototype(Todo);
