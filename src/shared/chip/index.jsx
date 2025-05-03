import React from 'react'
import { Tag } from 'antd';

const Chip = ({
    label,
    clearFilter
}) => {
    return (
        <span>
            <Tag
                style={{ padding: '5px', textTransform: "capitalize" }}
                color={label === 'Clear All' ? "error" : "default"}
                closable
                onClose={e => {
                    e.preventDefault();
                    clearFilter()
                }}
            >
                {/* will work only if value is not iterable like array */}
                {label?.toLowerCase()}
            </Tag>
        </span>
    )
}

export default Chip