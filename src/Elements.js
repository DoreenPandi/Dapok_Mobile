
import Spinner from 'react-native-loading-spinner-overlay';

export const LoadingOverlay = ({ loading }) => {
    if (!loading) return null;
    return (
        <Spinner
            loading
            color="#118ab2"
        />
    )
}