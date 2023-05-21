import React, { useState, useEffect, useRef } from "react";
import "./Dropdown.css";
import arrow from "./assets/arrow_icon.svg";

const Dropdown = ({
  items = [],
  onChange,
  value,
  width = "100%",
  iconSrc = arrow,
}) => {
  const [itemSelected, setItemSelected] = useState(null);
  const [openList, setOpenList] = useState(false);
  const ref = useRef();
  const listRef = useRef();

  const toggleOpenList = () => {
    setOpenList(!openList);
  };

  const selectItem = (item) => {
    onChange(item.value);
  };

  useEffect(() => {
    const index = items.findIndex((item) => item.value === value);
    setItemSelected(items[index]);
  }, [value, items]);

  useEffect(() => {
    if (openList) {
      document.addEventListener("click", handleClick);
      document.addEventListener("keydown", handleKeyDown);
      if (listRef.current?.childNodes) {
        const listItems = listRef.current.childNodes;
        const selectedIndex = items.findIndex(
          (item) => item.value === itemSelected.value
        );
        listItems[selectedIndex].focus();
      }
    } else {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, openList]);

  const handleClick = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !event.target.closest(".dropdownOP-list")
    ) {
      setOpenList(false);
    }
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
    const listItems = listRef?.current?.childNodes;
    if (listItems) {
      const focusedIndex = Array.prototype.indexOf.call(
        listItems,
        document.activeElement
      );
      if (
        event.key === "ArrowDown" ||
        (event.key === "Tab" && !event.shiftKey)
      ) {
        event.preventDefault();
        if (focusedIndex < items.length - 1) {
          listItems[focusedIndex + 1].focus();
        }
      } else if (
        event.key === "ArrowUp" ||
        (event.key === "Tab" && event.shiftKey)
      ) {
        event.preventDefault();
        if (focusedIndex > 0) {
          listItems[focusedIndex - 1].focus();
        }
      } else if (event.key === "Enter") {
        selectItem(items[focusedIndex]);
        setOpenList(false);
        ref.current.focus();
      } else if (event.key === "Escape" || event.key === " ") {
        event.preventDefault();
        setOpenList(!openList);
        ref.current.focus();
      }
    }
  };

  return (
    <>
      {itemSelected && (
        <div className="dropdownOP" ref={ref} style={{ width }}>
          <button
            type="button"
            id="filter"
            className="dropdownOP-toggle"
            aria-haspopup="listbox"
            aria-expanded={openList ? "true" : "false"}
            onClick={toggleOpenList}
            tabIndex={0}
          >
            <span>{itemSelected.name}</span>
            {iconSrc && <img src={iconSrc} alt=""></img>}
          </button>
          {openList && (
            <ul ref={listRef} role="listbox" className="dropdownOP-list">
              {items.map((item, index) => {
                return (
                  <li
                    key={item.name + item.value}
                    role="option"
                    aria-selected={
                      item.value === itemSelected.value ? "true" : "false"
                    }
                    onClick={() => {
                      selectItem(item);
                      setOpenList(false);
                    }}
                    className={`dropdownOP-item ${
                      item.value === itemSelected.value
                        ? "dropdownOP-item-selected"
                        : ""
                    }`}
                    tabIndex={0}
                  >
                    <span>{item.name}</span>
                    {index === 0 && iconSrc && <img src={iconSrc} alt=""></img>}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default Dropdown;
