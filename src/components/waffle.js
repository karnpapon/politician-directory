import React from "react"
import { Link } from "gatsby"

import "../styles/global.css"
import "./waffle.css"

let cellStyle = (color, borderColor) => ({
  position: "relative",
  width: 8,
  height: 8,
  boxSizing: "border-box",
  margin: "0 3px 3px 0",
  border: "1px solid var(--cl-black)",
  borderColor,
  backgroundColor: color,
  "&:hover": {
    border: "2px solid var(--cl-black)",
  },
  "&:hover .tooltip-text": {
    display: "block",
    zIndex: 10,
  },
})

const tooltipTextStyle = {
  display: "none",
  position: "absolute",
  top: "8px",
  left: "-2px",
  width: "250px",
  padding: "20px",
  color: "var(--cl-black)",
  fontSize: "1.8rem",
  lineHeight: "1.8rem",
  border: "2px solid #222222",
  borderRadius: "0 5px 5px 5px",
  backgroundColor: "white",
}

const full_name = node => `${node.title}${node.name} ${node.lastname}`

const split_array = (array, size, callback) =>
  Array(Math.ceil(array.length / size))
    .fill()
    .map((_, index) => index * size)
    .map(start => array.slice(start, start + size))
    .map(callback)

const waffle = (data, color, borderColor, add_separator) => {
  let result = split_array(data, 100, (hundred, hi) => (
    <div key={hi} className="hundred">
      {split_array(hundred, 25, (quarter, qi) => (
        <div key={qi} className="quarter">
          {quarter.map(({ node }) => (
            <div
              key={node.id}
              // title={full_name(node)}
              css={cellStyle(color, borderColor)}
            >
              <div className="tooltip-text" css={tooltipTextStyle}>
                <div>
                  <Link to={node.fields.slug}>{full_name(node)}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  ))

  if (add_separator) result.push(<div key="line" className="line"></div>)

  return result
}

const Waffle = ({ data, colors, borderColors, style, css }) => (
  <div className="waffle" css={css} style={style}>
    {data.map((group, group_idx) =>
      waffle(
        group,
        colors[group_idx],
        borderColors[group_idx],
        group_idx < data.length - 1
      )
    )}
  </div>
)

export default Waffle
