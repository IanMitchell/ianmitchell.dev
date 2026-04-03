export default function Logo() {
	return (
		<div className="h-12 w-12 border-[3px] border-[#333] p-1 hover:border-theme-blue dark:border-dark-theme-white dark:hover:border-theme-blue">
			<div className="flex h-6 w-6 items-center justify-center bg-[#333] text-center dark:bg-dark-theme-white">
				<span className="font-mono text-xs text-white dark:text-black">i</span>
			</div>
		</div>
	);
}
