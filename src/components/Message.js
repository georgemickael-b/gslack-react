import React, { useState } from 'react';
import getPattern from '../utils/pattern-generator';
import { Icon, Tooltip } from 'antd';
import { MessageWrapper } from '../styled-components/ui'

const Message = (props) => {
    let [showOptions, setShowOptions] = useState(false)
    let { message } = props
    const handleMouseHover = () => {
        if (props.canThread) {
            setShowOptions(!showOptions)
        }
    }
    return (
        <MessageWrapper onMouseEnter={handleMouseHover}
            onMouseLeave={handleMouseHover}>
            <table>
                <tbody>
                    <tr>
                        <td style={{ display: "flex" }}> <img src={getPattern(message.creator.name)} style={{ height: 30, width: 30 }} />&nbsp;</td>
                        <td>
                            <span style={{ fontWeight: 'bold' }}>{message.creator.name}</span>
                            {message.parentMessage && props.canThread && <small>(Thread Reply)</small>}
                            <span>
                                {
                                    showOptions && <Tooltip title={message.parentMessage ? "Open Thread" : "Start Thread"}><a style={{ marginLeft: "10px" }}
                                        href="javascript:void(0);" onClick={() => message.parentMessage ? props.setThreadMessage(message.parentMessage) : props.setThreadMessage(message)}>
                                        <Icon style={{ fontSize: "16px", verticalAlign: 0 }} type="message" />
                                    </a>
                                    </Tooltip>
                                }
                            </span>
                            <div>{message.message}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </MessageWrapper>

    )
}

export default Message