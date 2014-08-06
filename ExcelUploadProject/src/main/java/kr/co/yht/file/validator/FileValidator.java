package kr.co.yht.file.validator;

import kr.co.yht.file.model.UploadFile;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class FileValidator implements Validator {

	@Override
	public boolean supports(Class<?> arg0) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void validate(Object arg0, Errors arg1) {

		UploadFile file = (UploadFile) arg0;
		
		if(file.getFile().getSize() == 0){
			
			arg1.rejectValue("file",  "uploadForm.file", "Please select a file");
		}
	}

}
