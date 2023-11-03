export default function UploadView(){
    return (
        <div className="upload_wrap">
            <div className="upload_main">

                <div className="upload_title">
                    <h2>동영상 업로드</h2>
                    <h5>계정에 동영상 게시</h5>
                </div>

                <div className="upload_form">
                    <div className="upload_video">
                        <h5>업로드 할 동영상 선택</h5>
                        <span>MP4 또는 WebM</span>
                        <span>720x1280 해상도 이상</span>
                        <span>최대 30초</span>
                        <span>5MB 미만</span>
                        <button className="video_upload_btn">파일선택</button>
                    </div>
                    <div className="upload_info">
                        <div>
                            <label htmlFor="title">제목</label>
                            <input type="text" name="title" id="title"  />
                        </div>
                        <div>
                            <label htmlFor="contents">내용</label>
                            <textarea  name="contents" id="contents"  />
                        </div>

                        <div>
                            썸네일 업로드
                            <label htmlFor="file" >
                                <div className="thumn_upload_btn">파일 선택</div>
                            </label>
                            <input type="file" name="file" id="file" accept="image/*"/>
                        </div>

                        <div>
                            <label htmlFor="public_setting">누가 이 동영상을 볼 수 있나요</label>
                            <select name="public_setting">
                                <option value="public">공개</option>
                                <option value="private">학생</option>
                            </select>
                        </div>

                        <span>댓글 <input type="checkbox" name="comment"/></span>
                        <span>좋아요 <input type="checkbox" name="like"/></span>

                        <div className="form_btn_wrap">
                            <button className="form_post_btn">게시</button>
                            <button className="form_cancle_btn">취소</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}