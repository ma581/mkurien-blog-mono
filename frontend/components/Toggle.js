
import { ToggleButton, ButtonGroup, } from 'react-bootstrap';

export function Toggle({ radios, radioValue, setRadioValue }) {
    return (
        <ButtonGroup>
            {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={radioValue.checked ? 'outline-success' : 'outline-primary   '}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    )
}