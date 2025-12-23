import { useModal } from '@components';
import ModalNotify, { NotifyOptions } from '@components/ui/modal-notify';

export const useNotify = () => {
  const { modalControl } = useModal();

  const open = ({
    title,
    content,
    duration = 0,
    titleButton,
    imgSource,
    onDone,
    closeOnPressWrapper,
  }: NotifyOptions) => {
    modalControl?.open({
      title: '',
      closeOnPressWrapper: closeOnPressWrapper,
      content: (
        <ModalNotify
          title={title}
          content={content}
          duration={duration}
          onDone={onDone}
          titleButton={titleButton}
          imgSource={imgSource}
        />
      ),
    });
  };

  return {
    open,
    success: (content: string, onDone?: () => void) =>
      open({
        title: 'Success',
        content,
        duration: 3000,
        onDone,
      }),

    error: (content: string) =>
      open({
        title: 'Error',
        content,
      }),
  };
};
