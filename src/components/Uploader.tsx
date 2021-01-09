import React from "react";
import styled, { css } from "styled-components";
import { Plus, Archive } from "react-feather";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SyncOutlined } from "@ant-design/icons";
import { IImage } from "../models/image";
import { ImageActions } from "../redux/image";

// fake data generator
const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

// a little function to help us with reordering the result
const reorder = <T extends unknown>(list: T, startIndex, endIndex): T => {
    // @ts-ignore
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    //@ts-ignore
    return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle, background) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 ${grid}px ${grid}px 0`,
    backgroundImage: `url(${background})`,

    // change background colour if dragging
    opacity: isDragging ? 0.5 : 1,

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    padding: grid,
    overflow: "auto",
    flexWrap: "wrap"
});

const toBase64 = (file): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

const UploaderWrapper = styled.div`
    height: 10rem;
    display: flex;
    border: 2px dashed #ccc;
    background-color: #f2f2f2;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    height: 150px;
    min-width: 150px;

    .sync-icon {
        svg {
            width: 50px;
            height: 50px;
        }
    }
`;

const CloseButton = styled.button`
    padding: 5px;
    margin: 0;
    background-color: #ccc;
    border: none;
    margin-top: -10px;
    margin-right: -10px;

    svg {
        display: flex;
        color: #fff;
    }
`;

const ImageItem = styled.div`
    background-position: center;
    background-size: cover;

    display: flex;
    width: 150px;
    height: 150px;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0;
`;

interface IUploaderProps {
    multiple?: boolean;
    defaultImages: IImage[];
    onChange?: any;
}

const makeIdsString = images => images.map(({ id }) => id).join("");

const Uploader: React.FunctionComponent<IUploaderProps> = ({
    defaultImages,
    onChange,
    multiple
}) => {
    const [items, setItems] = React.useState<IImage[]>([]);

    const [loading, setLoading] = React.useState<boolean>(false);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (defaultImages.length) {
            setItems(defaultImages);
        }
    }, [defaultImages]);

    const onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const currItems: IImage[] = reorder<IImage[]>(
            items,
            result.source.index,
            result.destination.index
        );

        setItems(currItems);
    };

    const handleChange = async e => {
        const array: string[] = [];
        for (const file of e.target.files) {
            const base64String: string | ArrayBuffer | null = await toBase64(
                file
            );
            if (typeof base64String === "string") {
                array.push(base64String);
            }
        }

        // @ts-ignore
        const data: IImage[] = await dispatch(ImageActions.create(array));
        if (data) {
            setItems(data);
        }
    };

    const handleDelete = async (id: string) => {
        const result = await dispatch(ImageActions.destroy(id));
        //@ts-ignore
        if (result) {
            setItems(items => {
                return items.filter(item => id !== item.id);
            });
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >
                        {items.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <ImageItem
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                            item.smallUrl
                                        )}
                                        className="image-item"
                                    >
                                        <CloseButton
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        >
                                            <Archive size={20} />
                                        </CloseButton>
                                    </ImageItem>
                                )}
                            </Draggable>
                        ))}
                        <React.Fragment>
                            <UploaderWrapper
                                onClick={() => {
                                    // @ts-ignore
                                    document
                                        .getElementById("halaUploadId")
                                        .click();
                                }}
                            >
                                {!loading ? (
                                    <Plus size={50} />
                                ) : (
                                    <SyncOutlined spin className="sync-icon" />
                                )}
                            </UploaderWrapper>
                            <input
                                onChange={handleChange}
                                multiple={multiple || true}
                                style={{ display: "none" }}
                                id="halaUploadId"
                                type="file"
                            />
                        </React.Fragment>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default Uploader;
