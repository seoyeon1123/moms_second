import { MusicalNoteIcon } from '@heroicons/react/24/outline';

interface CheckBoxProps {
  check: boolean;
  onChange: () => void; // onChange 핸들러 추가
}

export default function CheckBox({ check, onChange }: CheckBoxProps) {
  return (
    <label className="flex flex-row gap-4 items-center">
      <input
        type="checkbox"
        name="share"
        className=" size-4"
        checked={check} // 체크 상태를 props로 받아옵니다.
        onChange={onChange} // 체크박스 변경 시 호출될 핸들러
      />
      나눔 ( 엄마들에게 나눔할게요
      <MusicalNoteIcon className="size-4" />)
    </label>
  );
}
