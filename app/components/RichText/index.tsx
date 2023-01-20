import ReactMarkdown from 'react-markdown';
interface RichTextProps{
  children: string;
}

const RichText = ({ children }: RichTextProps) => {
  return (
    <ReactMarkdown className='rich-text'>
      {children}
    </ReactMarkdown>
  );
};
export default RichText;
