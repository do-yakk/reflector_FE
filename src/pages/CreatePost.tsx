import React, { useState } from "react";
import { Button } from "../components/post/Button.tsx";
import { Block } from "../components/post/Block.tsx";
import styles from "./CreatePost.module.css";
import Post from "../components/post/Post.tsx";

type BlockVariant = "code" | "text";
interface PostBlock {
    id: number;
    variant: BlockVariant;
}

const CreatePostPage: React.FC = () => {
    const [blocks, setBlocks] = useState<PostBlock[]>([]);
    const [blockId, setBlockId] = useState(0);

    const addBlock = (variant: BlockVariant) => {
        setBlocks([...blocks, { id: blockId, variant}]);
        setBlockId(blockId + 1);
    }

    const handleBackClick = () => {
        window.history.back();
    };

    return (
        <div className={styles.container}>    
            <Button variant="back" onClick={handleBackClick}>←</Button>
            <div className={styles.container}>
                {/* 문제 기본 정보 */}
                <Post />      
                {/* 블럭들 */}
                <div className={styles.blocks}>
                    {blocks.map((block) => (
                        <Block key={block.id} variant={block.variant} />
                    ))}
                </div>
                {/* 블럭 추가 버튼 */}
                <div className={styles.button}>
                    <Button variant="add" onClick={() => addBlock("code")}>+ 코드 스니펫 추가</Button>
                    <Button variant="add" onClick={() => addBlock("text")}>+ 해설 추가</Button>
                </div>
                {/* 저장 버튼 */}
                <Button variant="save">완료</Button>
            </div>
        </div>

    );
};

export default CreatePostPage;