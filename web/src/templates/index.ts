import defaultFront from './standard/front.html.hbs';
import defaultBack from './standard/back.html.hbs';
import defaultCss from './standard/style.raw.css';
import { CardTemplate } from '../store/template/types';

export const standardTemplate: CardTemplate = {
    frontHbs: defaultFront, backHbs: defaultBack, styleCss: defaultCss,
};
