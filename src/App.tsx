import React, { CSSProperties, HTMLAttributes, useRef, useState } from "react";

import { styles } from "./styles";

interface CustomLabelStyles {
  topFocused?: number;
  topBlurred?: number;
  leftFocused?: number;
  leftBlurred?: number;
  fontSizeFocused?: number;
  fontSizeBlurred?: number;
}

interface Props {
  /** placeholder value */
  placeholder?: string;
  /** Set your placeholder styles */
  placeholderStyles?: CSSProperties;
  /** Floating label shown all times */
  label?: string;
  /** Set your label styles */
  labelStyles?: CSSProperties;
  /** Set your label properties */
  labelProperties?: HTMLAttributes<HTMLSpanElement>;
  /** Set your label styles */
  customLabelStyles?: CustomLabelStyles;
  /** Input value */
  value?: string;
  /** Set your input styles */
  inputStyles?: CSSProperties;
  /** Set your input properties */
  inputProperties?: HTMLAttributes<HTMLInputElement>;
  /** Calback to value change */
  onChange?: React.ChangeEvent<HTMLInputElement>;
  /** Set your input container styles */
  containerStyles?: CSSProperties;
  /** Set your input container properties */
  containerProperties?: HTMLAttributes<HTMLDivElement>;
  /** Set your label as a static floating label */
  staticLabel?: boolean;
}

function FloatingLabelInput({
  value,
  onChange,
  containerStyles,
  customLabelStyles,
  inputStyles,
  labelStyles,
  labelProperties,
  containerProperties,
  inputProperties,
  label = "Label",
  placeholderStyles,
  placeholder = "placeholder",
  staticLabel,
}: Props) {
  const prepareStyleSheet = () => {
    var style = document.createElement("style");
    //WebKit Hack
    style.appendChild(document.createTextNode(""));
    // Add the <style> element to the page
    document.head.appendChild(style);

    return style.sheet;
  };

  let styleSheet = prepareStyleSheet();

  let animationFocus = `@keyframes animateFocus {
      from {
        margin-top: ${customLabelStyles?.topBlurred || 0}px;
        font-size: ${customLabelStyles?.fontSizeBlurred || 30}px;
        margin-left: ${customLabelStyles?.leftBlurred || 0}px;
      }
      to {
        margin-top: ${customLabelStyles?.topFocused || -14.2}px;
        font-size: ${customLabelStyles?.fontSizeFocused || 18}px;
        margin-left: ${customLabelStyles?.leftFocused || 5}px;
      };
    }`;

  let animationBlur = `@keyframes animateBlur {
    from {
      margin-top: ${customLabelStyles?.topFocused || -14.2}px;
      font-size: ${customLabelStyles?.fontSizeFocused || 18}px;
      margin-left: ${customLabelStyles?.leftFocused || 5}px;
    }
    to {
      margin-top: ${customLabelStyles?.topBlurred || 0}px;
      font-size: ${customLabelStyles?.fontSizeBlurred || 30}px;
      margin-left: ${customLabelStyles?.leftBlurred || 0}px;
    };
  }`;

  let placeholderStyle = `input::placeholder {
      font-size: 30px;
      padding: 0px;
      outline: none;
      box-sizing: border-box;
      border: none;
      ${placeholderStyles}
    }`;

  styleSheet.insertRule(animationFocus, styleSheet.cssRules.length);
  styleSheet.insertRule(animationBlur, styleSheet.cssRules.length);
  styleSheet.insertRule(placeholderStyle, styleSheet.cssRules.length);

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const animation = !staticLabel
    ? {
        animationName: isFocused ? "animateFocus" : "animateBlur",
        animationDuration: "0.4s",
        animationDelay: "0.0s",
        animationIterationCount: 1,
        animationDirection: "normal",
        animationFillMode: "forwards",
      }
    : {};

  return (
    <div
      className="App"
      {...containerProperties}
      style={{
        ...styles.inputContainer,
        ...containerStyles,
        margin: 10,
      }}
    >
      <input
        {...inputProperties}
        ref={inputRef}
        placeholder={isFocused ? placeholder : ""}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          if (value === undefined || value?.length === 0) {
            setIsFocused(false);
          }
        }}
        style={{ ...styles.input, ...inputStyles }}
        onChange={(v) => {
          if (onChange) {
            return onChange;
          }
        }}
        value={value}
      />
      <span
        {...labelProperties}
        onClick={() => inputRef?.current?.focus()}
        style={{
          ...styles.label,
          ...labelStyles,
          ...animation,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export { FloatingLabelInput };
