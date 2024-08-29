import React from 'react';
import {
  DictionaryPhrases,
  Field,
  RichText as JssRichText,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import useDictionary from 'src/hooks/useDictionary';
import { useI18n } from 'next-localization';

interface Fields {
  Text: Field<string>;
}

export type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: RichTextProps): JSX.Element => {
  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );
  const id = props.params.RenderingIdentifier;
  const { getDictionaryValue } = useDictionary();
  const Context = useSitecoreContext();
  console.log('sitecoreContext: ', Context?.sitecoreContext?.site?.name);

  const i18n = useI18n<DictionaryPhrases>();

  const pageLanguage = Context?.sitecoreContext?.language || 'en';
  console.log(i18n.table(pageLanguage)?.DictionaryItem2, 'i18n');

  // Since DictionaryData is a Promise, you can't directly log its value like this
  // To see the data, you need to resolve the promise:

  return (
    <div
      className={`component rich-text ${props.params.styles.trimEnd()}`}
      id={id ? id : undefined}
    >
      <div className="component-content">
        {text}
        {getDictionaryValue('DictionaryItem1')}
      </div>
    </div>
  );
};
