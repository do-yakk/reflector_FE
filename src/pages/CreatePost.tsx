import React, { useState } from "react";
import { Button } from "../components/ui/button.tsx";
import { Block } from "../components/block.tsx";
import styles from "./CreatePost.module.css";
import Post from "../components/post.tsx";

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

    return (
        <div className={styles.container}>    
            <Button variant="back">←</Button>
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
            </div>
        </div>

    );
};

export default CreatePostPage;