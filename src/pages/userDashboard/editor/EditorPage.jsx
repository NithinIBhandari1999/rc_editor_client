import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import toast from 'react-hot-toast';

import { initSocket } from '../../../config/socket';

import constantSocketActions from '../../../constant/constantSocket/constantSocketActions';

let useEffectRunOnce = true;

const EditorPage = () => {
	const roomId = 'Test';

	// -----
	// useState
	const [val, setVal] = useState({
		shouldSync: true,
		code: '',
	});

	// -----
	// useRef
	const monacoEditorRef = useRef(null);
	const monacoEditor2Ref = useRef(null);
	const socketRef = useRef(null);

	// -----
	// useEffect
	useEffect(() => {
		let socketObj = socketRef?.current;

		// let monacoEditorObj = monacoEditorRef?.current;
		// console.log(monacoEditorObj?.getPosition());

		if (socketObj) {
			if (val.shouldSync) {
				socketObj.emit(constantSocketActions.CODE_CHANGE, {
					roomId: 'Test',
					code: val.code,
				});
			}
		}
	}, [val]);

	useEffect(() => {
		const init = async () => {
			try {
				console.log('Init');
				socketRef.current = await initSocket();

				let socketObj = socketRef.current;

				console.log(socketObj);

				socketObj.on('connect_error', (error) => {
					console.error(error);
					toast.error('Socket connection failed, try again later.');
				});

				socketObj.on('connect_failed', (error) => {
					console.error(error);
					toast.error('Socket connection failed, try again later.');
				});

				socketObj.on('connect_failed', (error) => {
					console.error(error);
					toast.error('Socket connection failed, try again later.');
				});

				// -----
				// emit: When user join
				socketObj.emit(constantSocketActions.JOIN, {
					roomId,
					username: location.state?.username,
				});

				// -----
				// on: When user join
				socketObj.on(constantSocketActions.CODE_CHANGE, (args) => {
					let argCode = args.code;

					if (typeof argCode === 'string') {
						setVal(() => {
							return {
								shouldSync: false,
								code: argCode,
							};
						});
					}
				});
			} catch (error) {
				console.error(error);
			}
		};

		if (useEffectRunOnce) {
			init();
		}

		return () => {
			useEffectRunOnce = false;

			let socketObj = socketRef?.current;

			if (socketObj) {
				socketObj.off(constantSocketActions.JOINED);
				socketObj.off(constantSocketActions.DISCONNECTED);
				socketObj.disconnect();
			}
		};
	}, []);

	return (
		<div>
			<h1>Editor Page</h1>

			<Editor
				height='calc(90vh - 10px)'
				defaultLanguage='javascript'
				defaultValue='// some comment'
				theme='vs-dark'
				value={val.code}
				onChange={(e) => {
					console.log(e);
					setVal(() => {
						return {
							shouldSync: true,
							code: e,
						};
					});
				}}
				onMount={(a, b) => {
					monacoEditorRef.current = a;
					monacoEditor2Ref.current = b;
					console.log({ a, b });
					console.log({ w: b.editor });
					console.log({ w2: new b.Selection().startLineNumber });
				}}
				editorDidMount={(event) => {
					console.log(event);
				}}
			/>
		</div>
	);
};

export default EditorPage;
