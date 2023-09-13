import React from "react";
import { isPrimitive } from "../utils";

type JSONValue =
  | null
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

interface JsonExplorerProps {
  data: Record<string, JSONValue>;
}

function JsonExplorer({ data }: JsonExplorerProps) {
  const [selectedPath, setSelectedPath] = React.useState<string[]>([]);
  const [selectedValue, setSelectedValue] = React.useState<JSONValue>(null);

  const handleKeyClick = (path: string[]) => {
    setSelectedPath(path);
    setSelectedValue(getValue(data, path));
  };

  const getValue = (obj: Record<string, JSONValue>, path: string[]) => {
    let value: JSONValue = obj;
    for (const k of path) {
      if (value !== null && typeof value === "object") {
        if (Array.isArray(value)) {
          value = value[Number(k)];
        } else {
          value = value[k];
        }
      }
    }
    return value;
  };

  const renderObject = (
    obj: Record<string, JSONValue>,
    path: string[] = [],
  ) => {
    const objKeys = Object.keys(obj);
    return (
      <>
        {"{"}
        <div className="ml-4">
          {objKeys.map((key, index) => (
            <div key={key}>
              <span
                // click disabled for non-primitive values as it is in the video. Although in task
                // description it says: "All keys can be interacted with and are highlighted"
                onClick={() =>
                  isPrimitive(obj[key]) ? handleKeyClick([...path, key]) : null
                }
                className={
                  isPrimitive(obj[key])
                    ? "cursor-pointer text-blue-600 hover:underline"
                    : ""
                }
              >
                {key}
              </span>
              : {renderJson(obj[key], [...path, key])}
              {index < objKeys.length - 1 && <span>,</span>}
            </div>
          ))}
        </div>
        {"}"}
      </>
    );
  };

  const renderArray = (arr: JSONValue[], path: string[] = []) => {
    return (
      <>
        [
        <div className="ml-4">
          {arr.map((item, index) => (
            <div key={index}>
              {renderJson(item, [...path, index.toString()])}
              {index < arr.length - 1 && <span>,</span>}
            </div>
          ))}
        </div>
        ]
      </>
    );
  };

  const renderJson = (data: JSONValue, path: string[] = []) => {
    if (typeof data === "object" && data !== null) {
      if (Array.isArray(data)) {
        return renderArray(data, path);
      } else {
        return renderObject(data, path);
      }
    } else {
      return <span>{JSON.stringify(data)}</span>;
    }
  };

  const renderPath = (path: string[]) => {
    return path.map((key, i) => {
      const nextIsString =
        path[i + 1] !== undefined && isNaN(Number(path[i + 1]));
      return (
        (isNaN(Number(key)) ? key : `[${key}]`) + (nextIsString ? "." : "")
      );
    });
  };

  return (
    <div className="h-full overflow-hidden p-4">
      <div className="flex h-full flex-col">
        <h1 className="text-3xl font-bold">Heyflow JSON Explorer</h1>
        <div className="my-4 flex min-h-0 flex-col rounded-md border-4 border-blue-500 border-opacity-25 p-6">
          <div className="mb-4 min-h-0 overflow-y-scroll font-mono">
            {renderJson(data)}
          </div>
          <hr className="my-6" />
          <div>
            <span className="font-semibold">Selected Path</span>:{" "}
            {/* print path keys separated by dots or by [] depending on key being a number or a string */}
            {selectedPath && renderPath(selectedPath)}
            <br />
            <span className="font-semibold">Selected Value</span>:{" "}
            {selectedValue && JSON.stringify(selectedValue)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JsonExplorer;
