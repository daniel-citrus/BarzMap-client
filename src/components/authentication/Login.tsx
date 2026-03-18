import PopupWrapper from '../dashboard/PopupWrapper';

interface LoginWindowProps {
    onClose: () => void;
}

const LoginWindow = ({ onClose }: LoginWindowProps) => {
    return (
        <PopupWrapper onClose={onClose}>
            <div />
        </PopupWrapper>
    );
};

export default LoginWindow;
