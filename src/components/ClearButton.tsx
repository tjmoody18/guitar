
interface ClearButtonProps {
  clearTab: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({
  clearTab
}) => {

  return (
    <button
     className="clear-button"
     onClick={clearTab}>
      Clear
    </button>
  )
}

export default ClearButton