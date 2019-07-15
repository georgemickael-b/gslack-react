import { notification } from 'antd'

function handleError(response) {
    notification["error"]({
        message: 'Oops!',
        description: response.data.message,
    });
}

export default handleError